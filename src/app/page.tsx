'use client';

import { useState } from 'react';

type User = {
  nin: string;
  bvn: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  image: string;
};

type VerificationStep = 'nin' | 'bvn' | 'biometric' | 'success';

export default function Home() {
  const [step, setStep] = useState<VerificationStep>('nin');
  const [nin, setNin] = useState('');
  const [bvn, setBvn] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleNINSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/verify-nin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nin }),
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setStep('bvn');
        setError('');
      } else {
        setError('Invalid NIN number');
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  const handleBVNSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && bvn === user.bvn) {
      setStep('biometric');
      setError('');
    } else {
      setError('Invalid BVN number');
    }
  };

  const handleBiometricSubmit = async () => {
    setIsScanning(true);
    try {
      // Create a credential request
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32).buffer, // Random challenge
          rpId: window.location.hostname,
          allowCredentials: [],
          userVerification: 'required',
          timeout: 60000,
        },
      });

      if (credential) {
        // Simulate a small delay to make it feel more realistic
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStep('success');
      }
    } catch {
      setError('Biometric verification failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          User Verification Platform
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 'nin' && (
            <form onSubmit={handleNINSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">Step 1: Enter NIN</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">NIN Number</label>
                <input
                  type="text"
                  value={nin}
                  onChange={(e) => setNin(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  pattern="[0-9]{11}"
                  required
                  placeholder="Enter your 11-digit NIN number"
                  aria-label="NIN Number"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Verify NIN
              </button>
            </form>
          )}

          {step === 'bvn' && (
            <form onSubmit={handleBVNSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">Step 2: Verify BVN</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">BVN Number</label>
                <input
                  type="text"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  pattern="[0-9]{11}"
                  required
                  placeholder="Enter your 11-digit BVN number"
                  aria-label="BVN Number"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Verify BVN
              </button>
            </form>
          )}

          {step === 'biometric' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700">Step 3: Biometric Verification</h2>
              <div className="text-center">
                <p className="text-gray-600 mb-4">Please place your finger on the sensor</p>
                <div className="relative w-48 h-48 mx-auto">
                  <div className={`absolute inset-0 rounded-full border-4 ${isScanning ? 'border-blue-500 animate-pulse' : 'border-gray-300'} transition-colors duration-300`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-32 h-32 rounded-full ${isScanning ? 'bg-blue-100' : 'bg-gray-100'} flex items-center justify-center transition-colors duration-300`}>
                        <svg
                          className={`w-16 h-16 ${isScanning ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-300`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {isScanning ? 'Scanning fingerprint...' : 'Waiting for fingerprint...'}
                </p>
              </div>
              <button
                onClick={handleBiometricSubmit}
                disabled={isScanning}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isScanning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isScanning ? 'Verifying...' : 'Start Biometric Verification'}
              </button>
            </div>
          )}

          {step === 'success' && user && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">Verification Successful!</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-center mb-6">
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">First Name</p>
                      <p className="font-medium">{user.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Name</p>
                      <p className="font-medium">{user.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Middle Name</p>
                      <p className="font-medium">{user.middleName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{user.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">NIN</p>
                      <p className="font-medium">{user.nin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">BVN</p>
                      <p className="font-medium">{user.bvn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
