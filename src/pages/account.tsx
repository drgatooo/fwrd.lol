import type { AccessToken, Link } from '@prisma/client';
import { Button, Input, Progress } from '@/components/core';
import type { GetServerSideProps } from 'next';
import { IoSparkles } from 'react-icons/io5';
import { Layout } from '@/components/layout';
import { MdFileCopy } from 'react-icons/md';
import { RelatedLinks } from '@/components/utils';
import axios from 'axios';
import { getSession } from '@/utils/auth';
import prisma from '@/lib/prisma';
import toast from 'react-hot-toast';
import { useBoolean } from '@/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MyAccount({ user }: AccountProps) {
	const router = useRouter();

	const [name, setName] = useState(user.name);
	const [at, setAt] = useState(user.accessTokens[0]?.accessToken as string | undefined);
	const [loading, { on, off }] = useBoolean(false);

	const fetchAccessToken = () => {
		on();
		const id = toast.loading('Generando token de acceso...');
		axios
			.post('/api/user/accessToken')
			.then(({ data }) => {
				off();
				toast.success(data.message, { id });
				setAt(data.token);
			})
			.catch(({ response }) => {
				off();
				return toast.error(response.data.message, { id });
			});
	};

	const updateName = () => {
		on();
		const id = toast.loading('Actualizando nombre...');
		axios
			.patch('/api/user/update', { name })
			.then(({ data }) => {
				off();
				toast.success(data.message, { id });
				router.reload();
			})
			.catch(({ response }) => {
				off();
				return toast.error(response.data.message, { id });
			});
	};

	const deleteAccount = () => {
		on();

		const prompt = window.prompt(
			'Escribe "OTINIANO KCHAME" (sin comillas) para confirmar la eliminación de tu cuenta.'
		);

		if (prompt !== 'OTINIANO KCHAME') {
			off();
			return toast.error('¡No se confirmó la eliminación de tu cuenta!');
		}

		const id = toast.loading('Eliminando cuenta...');
		return axios
			.delete('/api/user/delete')
			.then(() => {
				off();
				toast.success('¡Cuenta eliminada correctamente!');
				void router.push('/');
			})
			.catch(({ response }) => {
				off();
				return toast.error(response.data.message, { id });
			});
	};

	return (
		<Layout
			metadata={{
				title: 'Mi cuenta',
				description: 'Administra tu cuenta de usuario.'
			}}
		>
			<h2 className={'mt-5'}>Bienvenido, {user.name}</h2>
			<RelatedLinks />

			<div className={'flex flex-col gap-5'}>
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					label={'Cambiar nombre'}
					name={'name'}
					required
					maxLength={16}
				/>

				<Button
					onClick={updateName}
					loading={loading}
					disabled={name === user.name || !name.length}
					leftIcon={<IoSparkles />}
				>
					Aplicar
				</Button>
			</div>

			<div className={'flex flex-col gap-3'}>
				<h4>Token de acceso</h4>
				<p className={'text-sm'}>
					Controla tu cuenta desde nuestro API.{' '}
					<span
						onClick={() => {
							if (!loading) fetchAccessToken();
						}}
						className={'cursor-pointer text-rose-500 hover:underline'}
					>
						Haz clic aquí
					</span>{' '}
					para generar un nuevo token de acceso.
				</p>
				<div className={'flex gap-3'}>
					<Input
						name={'accesstoken'}
						label={'Guarda tu token'}
						disabled
						value={at ?? 'No creado aún :('}
					/>

					<button
						onClick={() => {
							if (!loading && at?.length) {
								navigator.clipboard
									.writeText(at)
									.then(() => {
										toast.success('¡Token copiado al portapapeles!');
									})
									.catch(() => {
										toast.error('¡No se pudo copiar el token al portapapeles!');
									});
							}
						}}
						disabled={!at?.length}
						className={
							'm-2 flex h-auto w-14 items-center justify-center rounded-full text-2xl transition hover:bg-black/20 dark:hover:bg-white/20'
						}
					>
						<MdFileCopy />
					</button>
				</div>
			</div>

			<div className={'flex flex-col gap-3'}>
				<h4>Uso de cuenta</h4>
				<p className={'text-sm'}>
					Tienes <strong>{user.links.length}</strong> enlaces acortados.{' '}
					{user.premium
						? 'Al ser usuario premium, ¡puedes crear enlaces ilimitados!'
						: `Te quedan ${20 - user.links.length} enlaces más para llegar al límite de tu cuenta.`}
				</p>
				<Progress
					progress={user.premium ? 0.9 : user.links.length / 20}
					color={user.links.length / 20 > 0.8 ? 'rose' : 'default'}
				/>
			</div>

			<div className={'flex flex-col gap-3 rounded-xl bg-rose-500/10 p-5'}>
				<h4>NO LO HAGAS!!!</h4>
				<p className={'text-sm'}>
					Si eliminas tu cuenta, todos tus enlaces y datos serán eliminados permanentemente. Esta
					acción no se puede deshacer.
				</p>

				<Button onClick={deleteAccount} color={'rose'} leftIcon={<IoSparkles />}>
					Eliminar cuenta
				</Button>
			</div>
		</Layout>
	);
}

export const getServerSideProps = (async ({ req, res }) => {
	const session = await getSession({ req, res });

	if (!session?.user) {
		return { redirect: { destination: '/' } };
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email! },
		select: {
			name: true,
			links: true,
			premium: true,
			accessTokens: true
		}
	});

	return {
		props: { user: JSON.parse(JSON.stringify(user)) }
	};
}) as GetServerSideProps<AccountProps>;

export interface AccountProps {
	user: {
		name: string;
		links: Link[];
		premium: boolean;
		accessTokens: AccessToken[];
	};
}
