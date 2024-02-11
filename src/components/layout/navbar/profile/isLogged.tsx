import { MdCreate, MdDashboard, MdLogout, MdPalette, MdQrCode, MdTag } from 'react-icons/md';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MenuItem } from '@/components/utils';
import type { SessionContextValue } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface NavUserLoggedProps {
	session: SessionContextValue;
}

export function NavUserLogged({ session: { data } }: NavUserLoggedProps) {
	return (
		<Menu as={'div'} className={'mainmenu relative'}>
			<Menu.Button data-c data-color={'default'} data-v={'solid'} name={'Opciones de usuario'}>
				<MdTag />
				<span className={'max-w-16 truncate md:max-w-min'}>
					{data?.user?.name?.split(' ').slice(0, 1)[0]}
				</span>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out-expo duration-200"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in-expo duration-100"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items as={'menu'}>
					<div className="px-1 py-1">
						<MenuItem href={'/new'}>
							<MdCreate /> Nuevo enlace
						</MenuItem>
						<MenuItem href={'/dashboard'}>
							<MdDashboard /> Gestionar
						</MenuItem>
					</div>
					<div className="px-1 py-1">
						<MenuItem href={'/link-in-bio'}>
							<MdPalette />
							Link-in-bio
						</MenuItem>
						<MenuItem href={'/create-qr'}>
							<MdQrCode />
							Código QR
						</MenuItem>
					</div>
					<div className="px-1 py-1">
						<MenuItem onClick={() => signOut()}>
							<MdLogout /> Cerrar sesión
						</MenuItem>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
