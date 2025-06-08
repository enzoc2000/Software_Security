import React, { useState, useEffect } from 'react';
import connectWallet from '../utils/ConnectWallet';

const NO_SYMBOLS = [",", ".", "?", "|", `"`, "'", "=", "&"];
const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3010; // Default port if not set
const MAX_RETRY_ATTEMPTS = 3;
const LOCKOUT_DURATION = 30; // seconds

function hasForbiddenSymbol(value: string): boolean {
  return NO_SYMBOLS.some(sym => value.includes(sym));
}

function isLengthValid(value: string, min = 3, max = 50): boolean {
  return value.length >= min && value.length <= max;
}

function isFieldOK(value: string): boolean {
  return isLengthValid(value) && !hasForbiddenSymbol(value);
}

function userOK(user: { username: string, password: string, walletAddress: string }): boolean {
  const { username, password, walletAddress } = user;

  const allFieldsValid =
    isFieldOK(username) &&
    isFieldOK(password) &&
    isFieldOK(walletAddress);

  const allDistinct =
    username !== password &&
    username !== walletAddress &&
    password !== walletAddress;

  return allFieldsValid && allDistinct;
}

interface Utente {
  username: string;
  password: string;
  walletAddress: string;
}

async function loginApi(utente: Utente) {
  const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(utente),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error("Login failed: " + err.error);
  }
  const data: { userId: number, urlEmail: string } = await res.json();
  return data;
}

interface Props {
  onOtpSent: (userId: number) => void;
}

function LoginCardForm({ onOtpSent }: Props) {
  const [datiUtente, setDatiUtente] = useState<Utente>({
    username: "",
    password: "",
    walletAddress: ""
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Loading...");
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [remainingLockTime, setRemainingLockTime] = useState<number>(0);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // Timer effect for lockout countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLocked && remainingLockTime > 0) {
      interval = setInterval(() => {
        setRemainingLockTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLocked, remainingLockTime]);

  const showDialogMessage = (message: string) => {
    setDialogMessage(message);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setDialogMessage("");
  };

  const buttonConnectWallet = async () => {
    if (isLocked) return;
    
    const objPromise = connectWallet();
    setDatiUtente({
      ...datiUtente!,
      walletAddress: (await objPromise).address
    });
  }

  const handleInputChange = (name: string, e: string) => {
    if (isLocked) return;
    
    setDatiUtente({
      ...datiUtente!,
      [name]: e
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      showDialogMessage(`Account locked. Please wait ${remainingLockTime} seconds before trying again.`);
      return;
    }

    const currentUser = { ...datiUtente };
    
    if (!userOK(currentUser)) {
      showDialogMessage("Dati non validi");
      return;
    }

    try {
      setLoadingMessage("Redirection...");
      setShowModal(true);
      
      // API call
      const res = await loginApi(currentUser);
      console.log(res.urlEmail);
      
      // Success - reset attempts and clear form
      setFailedAttempts(0);
      setDatiUtente({
        username: "",
        password: "",
        walletAddress: ""
      });
      
      onOtpSent(res.userId);
      setShowModal(false);
      
    } catch (error) {
      setShowModal(false);
      
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      
      if (newFailedAttempts >= MAX_RETRY_ATTEMPTS) {
        // Lock the account
        setIsLocked(true);
        setRemainingLockTime(LOCKOUT_DURATION);
        showDialogMessage(`Login failed too many times. Account locked for ${LOCKOUT_DURATION} seconds.`);
        
        // Clear the form
        setDatiUtente({
          username: "",
          password: "",
          walletAddress: ""
        });
      } else {
        const remainingAttempts = MAX_RETRY_ATTEMPTS - newFailedAttempts;
        showDialogMessage(`Login fallito: ${error}. ${remainingAttempts} attempt(s) remaining.`);
        
        // Clear only password on failed attempt
        setDatiUtente({
          ...datiUtente,
          password: ""
        });
      }
    }
  }

  const getRemainingAttemptsText = () => {
    if (isLocked) return null;
    if (failedAttempts === 0) return null;
    
    const remaining = MAX_RETRY_ATTEMPTS - failedAttempts;
    return (
      <div className="text-red-600 text-sm mb-2 text-center">
        {remaining} attempt(s) remaining before lockout
      </div>
    );
  };

  const getLockoutMessage = () => {
    if (!isLocked) return null;
    
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <div className="text-center">
          <p className="font-bold">Account Locked</p>
          <p>Too many failed attempts. Please wait {remainingLockTime} seconds.</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='m-5'>
        <button 
          onClick={buttonConnectWallet}
          disabled={isLocked}
          className={`text-sm ms-50 border-2 font-bold py-1 px-1 ${
            isLocked ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          Connect Wallet
        </button>
        
        {getLockoutMessage()}
        {getRemainingAttemptsText()}
        
        <form 
          className={`grid border-3 rounded-lg p-4 m-4 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 ${
            isLocked ? 'opacity-50' : ''
          }`}
          onSubmit={handleSubmit}>
          
          <input 
            className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text"
            name="username"
            placeholder='username'
            value={datiUtente.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            disabled={isLocked}
          />
          
          <input 
            className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="password"
            name="password"
            placeholder='password'
            value={datiUtente.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            disabled={isLocked}
          />
          
          <input 
            className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text"
            name="walletAddress"
            placeholder='clickOnConnectWallet'
            value={datiUtente.walletAddress}
            onChange={(e) => handleInputChange("walletAddress", e.target.value)}
            readOnly
            disabled={isLocked}
          />
          
          <button 
            className={`grid p-2 m-1 border-2 border-red-800 text-red-800 font-bold py-2 px-4 rounded-lg ${
              (showModal || isLocked) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={showModal || isLocked}>
            {isLocked ? `Locked (${remainingLockTime}s)` : 'Login'}
          </button>
        </form>
        
        {showModal && (
          <div className="fixed p-5 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-4 border-2 rounded-lg text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
              <p>{loadingMessage}</p>
            </div>
          </div>
        )}

        {showDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div 
              className="bg-white p-6 border-2 rounded-lg max-w-md mx-4 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 cursor-pointer transform transition-transform hover:scale-105"
              onClick={closeDialog}
            >
              <div className="text-center">
                <p className="text-lg text-gray-800 mb-4">{dialogMessage}</p>
                <p className="text-sm text-gray-500">Click anywhere to close</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LoginCardForm;