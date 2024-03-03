import { Button, Input, Progress } from '@/components/core';
import { MdFileCopy, MdWarning } from 'react-icons/md';
import type { GetServerSideProps } from 'next';
import { IoSparkles } from 'react-icons/io5';
import { Layout } from '@/components/layout';
import type { Link } from '@prisma/client';
import { RelatedLinks } from '@/components/utils';
import axios from 'axios';
import { getSession } from '@/utils/auth';
import prisma from '@/lib/prisma';
import toast from 'react-hot-toast';
import { useBoolean } from '@/hooks';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function AccountPage({ user }: AccountProps) {
	const { update } = useSession();
	const router = useRouter();

	const [name, setName] = useState(user.name);
	const [at, setAt] = useState<string | undefined>(undefined);
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
				void update();
			})
			.catch(({ response }) => {
				off();
				return toast.error(response.data.message, { id });
			});
	};

	const deleteAccount = () => {
		on();

		const requiredWord = `chau ${user.name}`;

		const prompt = window.prompt(
			`Escribe "${requiredWord}" (sin comillas) para confirmar la eliminación de tu cuenta.`
		);

		if (prompt !== requiredWord) {
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
			restricted
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
				<div className={'flex flex-col gap-5'}>
					<Input
						name={'accesstoken'}
						label={'Guarda tu token'}
						disabled
						value={
							at ??
							(user.hasAccessToken
								? 'No puedes volver a ver tu token :)'
								: 'Prueba creando tu primer token')
						}
					/>

					<div className="flex items-center gap-3">
						<Button
							leftIcon={<MdFileCopy />}
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
							disabled={loading || !at?.length}
							loading={loading}
						>
							Copiar
						</Button>
						{at?.length && (
							<p className={'inline-flex items-center gap-1.5 text-sm'}>
								<MdWarning /> por motivos de seguridad, los tokens solo se pueden ver una vez cuando
								son creados.
							</p>
						)}
					</div>
				</div>
			</div>

			<div className={'flex flex-col gap-3'}>
				<h4>Uso de cuenta</h4>
				<p className={'text-sm'}>
					Tienes <strong>{user.links.length}</strong> enlaces acortados.{' '}
					{user.premium
						? 'Al ser usuario premium, ¡puedes crear enlaces ilimitados!'
						: `Te quedan ${30 - user.links.length} enlaces más para llegar al límite de tu cuenta.`}
				</p>
				<Progress
					progress={user.premium ? 0.9 : user.links.length / 30}
					color={user.links.length / 30 > 0.8 ? 'rose' : 'default'}
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

	if (!user) {
		return { redirect: { destination: '/' } };
	}

	return {
		props: {
			user: {
				name: user.name,
				links: JSON.parse(JSON.stringify(user.links)),
				premium: user.premium,
				hasAccessToken: user.accessTokens.length > 0
			}
		}
	};
}) as GetServerSideProps<AccountProps>;

export interface AccountProps {
	user: {
		name: string;
		links: Link[];
		premium: boolean;
		hasAccessToken: boolean;
	};
}
