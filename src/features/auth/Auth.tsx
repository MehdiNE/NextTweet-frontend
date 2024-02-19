"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { FaGithub, FaHeart } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import { toast } from "react-toastify";

function Auth() {
  const [openCreateAccount, setOpenCreateAccount] = useState<boolean>(false);
  const [openSignIn, setOpenSignIn] = useState<boolean>(false);

  function toggleCreateAccountDialog(open: boolean) {
    setOpenCreateAccount(open);
  }

  function toggleSignInDialog(open: boolean) {
    setOpenSignIn(open);
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="relative h-full w-1/2">
        <Image
          src="/assets/auth-background.jpg"
          className="object-cover"
          fill
          alt="loginImage"
        />
      </div>

      <div className="flex h-full w-1/2 flex-col pb-4 pl-12 min-[1700px]:pb-9">
        <div className="mt-10 space-y-8 font-semibold min-[1700px]:mt-20">
          <h3 className="text-7xl">Happening now</h3>
          <h5 className="text-4xl">Join today.</h5>
        </div>

        <div className="mt-16 flex w-72 flex-col gap-2">
          <Button
            onClick={() => toast.success("data.message")}
            variant="outline"
          >
            <FcGoogle className="mr-2 text-lg" /> Sign up with Google
          </Button>
          <Button variant="outline">
            <FaGithub className="mr-2 text-lg" /> Sign up with GitHub
          </Button>

          <div className="relative flex items-center py-2 text-sm">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="mx-2 flex-shrink text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <Button onClick={() => toggleCreateAccountDialog(true)}>
            Create account
          </Button>
          <p className="text-[11px]">
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
        </div>

        <div className="mt-10 w-72 space-y-3 font-semibold min-[1700px]:mt-16">
          <h4>Already have an account?</h4>
          <Button onClick={() => toggleSignInDialog(true)}>Sign in</Button>
        </div>

        <div className="mt-auto flex flex-col items-center justify-center gap-2 text-center text-xs font-medium">
          <div className="flex items-center gap-1">
            <p>
              Created with <FaHeart className="inline-block text-red-500" /> by
            </p>
            <a
              href="https://github.com/MehdiNE/nextTweet_frontend"
              target="_blank"
              className="cursor-pointer text-blue-500"
            >
              Mahdi Nemati
            </a>
          </div>

          <a
            href="https://github.com/MehdiNE/nextTweet_frontend"
            target="_blank"
          >
            <FaGithub className="text-xl text-slate-500" />
          </a>
        </div>
      </div>

      <CreateAccount
        openCreateAccount={openCreateAccount}
        toggleCreateAccountDialog={toggleCreateAccountDialog}
      />

      <SignIn openSignIn={openSignIn} toggleSignInDialog={toggleSignInDialog} />
    </div>
  );
}

export default Auth;
