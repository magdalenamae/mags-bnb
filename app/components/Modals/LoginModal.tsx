'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import Button from "../Button";
import { signIn } from "next-auth/react";

import {
    FieldValues, 
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { log } from "console";

const LoginModal = () => {
    const router = useRouter();

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setIsLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success("Logged in successfully");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }, []);

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title="Welcome back"
                subtitle="Login to your account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr /> 
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn("google")}
            />
            <hr /> 
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    font-light
                    mt-4
                "
            >
                <div
                    className="
                    flex
                    flex-row
                    items-center
                    gap-2
                    justify-center
                    "
                >
                    <div>
                        First time using Magsbnb?
                    </div>
                    <div className="
                            text-nutral-800
                            cursor-pointer
                            hover: underline
                        "
                        onClick={toggle}
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
        
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;