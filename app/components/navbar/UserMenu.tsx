'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
    image: string | null | undefined;
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ image, currentUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    // Log currentUser to see its value
    console.log('Current user:', currentUser);

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div
                    onClick={() => console.log('User menu clicked')}
                    className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className='p-4 md:py-1 md:px-2 border-[1px] rounded-full border-neutral-200 flex flex-row items-center gap-3 cursor-pointer transition hover:shadow-md'
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
                {isOpen && (
                    <div className='absolute rounded-xl shadow-md w-[40vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                        <div className='flex flex-col cursor-pointer'>
                            {currentUser ? (
                                <>
                                    <MenuItem
                                        onclick={() => console.log('My trips clicked')}
                                        label='My trips'
                                    />
                                    <MenuItem
                                        onclick={() => console.log('My favourites clicked')}
                                        label='My favourites'
                                    />
                                    <MenuItem
                                        onclick={() => console.log('My reservations clicked')}
                                        label='My reservations'
                                    />
                                    <MenuItem
                                        onclick={() => console.log('Airbnb my home clicked')}
                                        label='Airbnb my home'
                                    />
                                    <MenuItem
                                        onclick={() => signOut({ redirect: true, callbackUrl: '/' })}
                                        label='Logout'
                                    />
                                </>
                            ) : (
                                <>
                                    <MenuItem
                                        onclick={loginModal.onOpen}
                                        label='Login'
                                    />
                                    <MenuItem
                                        onclick={registerModal.onOpen}
                                        label='Sign up'
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;
