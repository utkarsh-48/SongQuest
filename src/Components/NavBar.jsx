import React from 'react'

function NavBar() {
  return (
    <div className="flex w-full justify-between  h-11 text-white flex items-center px-6 fixed top-0 left-0 ">
      <h1 className='text-[#9E2B25] text-2xl '>SongQuest</h1>
      <button>
        Login/SignUp
      </button>
    </div>
  )
}

export default NavBar