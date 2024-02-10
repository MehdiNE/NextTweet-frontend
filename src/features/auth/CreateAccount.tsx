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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { days, months, years } from "@/lib/constant";
import { ICreateAccountStep } from "./authTypes";

interface IProps {
  openCreateAccount: boolean;
  toggleCreateAccountDialog: (open: boolean) => void;
}

function CreateAccount({
  openCreateAccount,
  toggleCreateAccountDialog,
}: IProps) {
  const [step, setStep] = useState<ICreateAccountStep>("email");
  const [isEmail, setIsEmail] = useState<boolean>(true);

  function toggleIsEmail() {
    setIsEmail(!isEmail);
  }

  return (
    <Dialog open={openCreateAccount} onOpenChange={toggleCreateAccountDialog}>
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
          <div className="mt-3 space-y-4">
            <Input placeholder="Name" autoComplete="name" />

            <div className="flex flex-col">
              {isEmail ? (
                <Input type="email" placeholder="Email" autoComplete="email" />
              ) : (
                <Input placeholder="Phone" autoComplete="phone" />
              )}

              <Button
                onClick={toggleIsEmail}
                variant="link"
                size="sm"
                className="-mr-2.5 ml-auto w-36"
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
              <Button size="lg">Next</Button>
            </div>
          </div>
        )}

        {step === "password" && (
          <div className="mt-3">
            <Input placeholder="Password" />
            <Input placeholder="Confirm Password" className="mt-7" />
            <div className="mt-40">
              <Button size="lg">Next</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccount;
