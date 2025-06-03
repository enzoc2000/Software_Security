import LoginCardForm from "./LoginCardForm";
import { Link } from "react-router-dom";
import { OtpForm } from "./OtpForm";
import { useState } from "react";

export function Login() {
    const [step, setStep] = useState<"login" | "otp">("login");
    const [userIdForOtp, setUserIdForOtp] = useState<number>(0);
    return (
        <>
            <div className="flex flex-col w-screen h-screen place-items-center" >
                {step === "login"
                    && (
                        <>
                            <LoginCardForm
                                onOtpSent={userId => {
                                    setUserIdForOtp(userId);
                                    setStep("otp");
                                }} />
                            <Link to="/registration">Registration</Link>
                        </>
                    )
                }
                {step === "otp" && <OtpForm userId={userIdForOtp} />}
            </div>
        </>
    )
}
