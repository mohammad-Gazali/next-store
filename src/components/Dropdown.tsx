"use client";
import { Route } from '@/types/app';
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from 'lucide-react';
import { FC, Fragment } from 'react'
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import AuthButtonDropDown from './AuthButtonDropDown';



interface DropDownProps {
    routes: Route[];
    isNav?: boolean;
    isAuth?: boolean;
}

const DropDown: FC<DropDownProps> = ({ routes, isNav, isAuth }) => {
  return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className={buttonVariants({ variant: "ghost", className: "hover:bg-white/5 hover:text-primary-foreground" })}>
            <MenuIcon
                className="h-6 w-6"
                aria-hidden="true"
            />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-muted rounded-md bg-secondary-foreground shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
            {routes.map(route => {
                return (
                    <Menu.Item key={route.id}>
                        <Link
                        href={route.href}
                        className="flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm text-foreground hover:bg-secondary hover:text-secondary-foreground transition-all"
                        >
                            {route.icon} {route.content}
                        </Link>
                    </Menu.Item>
                )
            })}
            {
                isNav
                ?
                <Menu.Item key={"route.id"}>
                    <AuthButtonDropDown isAuth={isAuth!} />
                </Menu.Item>
                :
                null
            }
          </Menu.Items>
        </Transition>
      </Menu>
  )
}


export default DropDown