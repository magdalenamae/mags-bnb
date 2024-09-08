'use client';

import { BiUser } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useState } from 'react';
import MenuItem from './MenuItem';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    return (
       <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div
                    onClick={() => console.log('User menu clicked')}
                    className='
                    hidden 
                    md:block 
                    text-sm 
                    font-semibold 
                    py-3 px-4 
                    rounded-full 
                    hover:bg-neutral-100 
                    transition
                    cursor-pointer' 
                >
                 Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className='
                    p-4 
                    md:py-1 
                    md:px-2 
                    border-[1px] 
                    rounded-full 
                    border-neutral-200
                    flex 
                    flex-row 
                    items-center 
                    gap-3 
                    cursor-pointer 
                    transition 
                    hover:shadow-md'
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
                {isOpen && (
                    <div
                        className='
                            absolute
                            rounded-xl
                            shadow-md
                            w-[40vw]
                            bg-white
                            overflow-hidden
                            right-0
                            top-12
                            text-sm
                        '
                    >
                    <div className='flex flex-col cursor-pointer'>
                        <>
                            <MenuItem 
                            onclick={() => console.log('Profile clicked')}
                            label='Login'                                
                            />
                            <MenuItem 
                            onclick={() => console.log('Profile clicked')}
                            label='Sign up'                                
                            />
                        </>
                    </div>

                    </div>
                )}
            </div>
       </div>
    );
};

export default UserMenu;