"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/services/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IProps {
  openSignIn: boolean;
  toggleSignInDialog: (open: boolean) => void;
}

type Inputs = {
  email: string;
  password: string;
};

function SignIn({ openSignIn, toggleSignInDialog }: IProps) {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginMutation.mutate(data, {
      onSuccess(data) {
        if (data.status === "success") {
          toast.success(data.message);
        }
      },

      onError(error) {
        setError("password", { message: error.response?.data.message });
        setError("email", { message: error.response?.data.message });
      },
    });
  };

  return (
    <Dialog open={openSignIn} onOpenChange={toggleSignInDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to nextTweet</DialogTitle>
          <DialogDescription>
            Enter your information and sign in!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-7 space-y-4 px-10">
          <Button variant="outline">
            <FcGoogle className="mr-2 text-lg" /> Sign in with Google
          </Button>
          <Button variant="outline">
            <FaGithub className="mr-2 text-lg" /> Sign in with GitHub
          </Button>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex items-center py-1 text-sm">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="mx-2 flex-shrink text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>
            <div>
              <Input
                placeholder="Phone, Email or username"
                {...register("email", { required: "Please provide email!" })}
                variant={errors.email && "error"}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <Input
              placeholder="Password"
              {...register("password", {
                required: "Please provide password!",
              })}
              variant={errors.password && "error"}
            />
            <Button>Log in</Button>
            <Button type="button" variant="secondary">
              Forgot password?
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignIn;
