"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { days, months, years } from "@/lib/constant";
import { ICreateAccountStep } from "./authTypes";
import { useCheckUserExist, useCreateUserMutation } from "@/services/auth";
import { toast } from "react-toastify";

interface IProps {
  openCreateAccount: boolean;
  toggleCreateAccountDialog: (open: boolean) => void;
}

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type InputsEmail = {
  name: string;
  email: string;
};

function CreateAccount({
  openCreateAccount,
  toggleCreateAccountDialog,
}: IProps) {
  const [step, setStep] = useState<ICreateAccountStep>("email");
  const [isEmail, setIsEmail] = useState<boolean>(true);

  const createUserMutation = useCreateUserMutation();
  const checkUserMutation = useCheckUserExist();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitEmail: SubmitHandler<InputsEmail> = (data) => {
    checkUserMutation.mutate(
      { ...data, isEmail },
      {
        onSuccess() {
          stepHandler("password");
        },
        onError(error) {
          setError("email", { message: error.response?.data?.message });
        },
      },
    );
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createUserMutation.mutate(data, {
      onSuccess(data) {
        if (data.status === "success") {
          toast.success(data.message);
        }
      },
      onError(error) {
        setError("password", { message: error.response?.data.message });
        setError("confirmPassword", { message: error.response?.data.message });
      },
    });
  };

  function stepHandler(step: ICreateAccountStep) {
    setStep(step);
  }

  function toggleIsEmail() {
    setIsEmail(!isEmail);
  }

  return (
    <Dialog
      open={openCreateAccount}
      onOpenChange={(e) => {
        toggleCreateAccountDialog(e);
        setStep("email");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
          <DialogDescription>
            {step === "email"
              ? "Enter your information and join NextTweet today!"
              : "Enter a password to secure your account, your password should at lest be 8 character and contain letters and a number"}
          </DialogDescription>
        </DialogHeader>

        {step === "email" && (
          <form
            onSubmit={handleSubmit(onSubmitEmail)}
            className="mt-3 space-y-4"
          >
            <Input
              placeholder="Name"
              {...register("name", { required: true })}
              variant={errors.name && "error"}
            />

            <div className="flex flex-col">
              {isEmail ? (
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Please provide email!" })}
                  variant={errors.email && "error"}
                />
              ) : (
                <Input placeholder="Phone" type="number" />
              )}

              <p className="mt-1.5 text-sm text-red-500">
                {errors.email?.message}
              </p>

              <Button
                onClick={toggleIsEmail}
                variant="link"
                size="sm"
                className="-mr-2.5 ml-auto w-36"
                type="button"
              >
                Use {isEmail ? "phone" : "email"} instead
              </Button>
            </div>

            <div className="text-sm">
              <h5 className="font-semibold">Date of birth</h5>
              <p className="text-muted-foreground">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </p>
            </div>

            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((item) => (
                    <SelectItem value={item.name} key={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((item) => (
                    <SelectItem value={String(item.day)} key={item.day}>
                      {item.day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((item) => (
                    <SelectItem value={String(item.year)} key={item.year}>
                      {item.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-10">
              <Button isLoading={checkUserMutation.isPending} size="lg">
                Next
              </Button>
            </div>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <Input
              placeholder="Password"
              {...register("password", {
                required: "Please provide password!",
              })}
              variant={errors.password && "error"}
            />
            <p className="mt-1.5 text-sm text-red-500">
              {errors.password?.message}
            </p>

            <Input
              placeholder="Confirm Password"
              className="mt-7"
              {...register("confirmPassword", {
                required: "Please provide confirm password!",
              })}
              variant={errors.confirmPassword && "error"}
            />
            <p className="mt-1.5 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>

            <div className="mt-40">
              <Button isLoading={createUserMutation.isPending} size="lg">
                Sign up
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccount;
