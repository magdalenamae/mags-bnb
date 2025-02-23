'use client';

import { BiSearch } from 'react-icons/bi';

const Search = () => {
    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center">
            <div className="text-sm font-semibold px-6">
                Anywhere
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                Any week
            </div>
            <div className="text-sm pl-6 pr-2 text-grey-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block">Add guests</div>
                <div className="bg-rose-500 rounded-full p-2">
                    <BiSearch size={18} color="white"/>
                </div>
            </div>    
            </div>
        </div>
    );
}

export default Search;