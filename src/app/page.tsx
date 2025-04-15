"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle, AlertCircle, Fingerprint, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type UserType = {
  nin: string
  bvn: string
  firstName: string
  lastName: string
  middleName: string
  gender: string
  image: string
}

type VerificationStep = "nin" | "bvn" | "biometric" | "success"

export default function Home() {
  const [step, setStep] = useState<VerificationStep>("nin")
  const [nin, setNin] = useState("")
  const [bvn, setBvn] = useState("")
  const [user, setUser] = useState<UserType | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  // Progress indicator based on current step
  useEffect(() => {
    const stepValues = { nin: 25, bvn: 50, biometric: 75, success: 100 }
    setProgress(stepValues[step])
  }, [step])

  const handleNINSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validate NIN format
      if (!/^\d{11}$/.test(nin)) {
        throw new Error("NIN must be 11 digits")
      }

      const response = await fetch("/api/verify-nin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nin }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        toast({
          title: "NIN Verified",
          description: "Your NIN has been successfully verified.",
          variant: "default",
        })
        setStep("bvn")
      } else {
        setError(data.message || "Invalid NIN number")
        toast({
          title: "Verification Failed",
          description: data.message || "Invalid NIN number",
          variant: "destructive",
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again."
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBVNSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validate BVN format
      if (!/^\d{11}$/.test(bvn)) {
        throw new Error("BVN must be 11 digits")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (user && bvn === user.bvn) {
        toast({
          title: "BVN Verified",
          description: "Your BVN has been successfully verified.",
          variant: "default",
        })
        setStep("biometric")
      } else {
        throw new Error("Invalid BVN number")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again."
      setError(errorMessage)
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBiometricSubmit = async () => {
    setError("")
    setIsScanning(true)

    try {
      // Simulate biometric verification process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Biometric Verified",
        description: "Your fingerprint has been successfully verified.",
        variant: "default",
      })
      setStep("success")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Biometric verification failed. Please try again."
      setError(errorMessage)
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsScanning(false)
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case "nin":
        return "Step 1: Enter NIN"
      case "bvn":
        return "Step 2: Verify BVN"
      case "biometric":
        return "Step 3: Biometric Verification"
      case "success":
        return "Verification Successful!"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case "nin":
        return "Please enter your 11-digit National Identification Number"
      case "bvn":
        return "Please enter your 11-digit Bank Verification Number"
      case "biometric":
        return "Please complete fingerprint verification"
      case "success":
        return "Your identity has been verified successfully"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">User Verification Platform</h1>
          <p className="text-emerald-600">Secure, Fast, and Reliable Identity Verification</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <Progress value={progress} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-500" />
          <div className="flex justify-between mt-2 text-sm text-emerald-700">
            <span className={cn(progress >= 25 ? "font-medium" : "text-emerald-400")}>NIN</span>
            <span className={cn(progress >= 50 ? "font-medium" : "text-emerald-400")}>BVN</span>
            <span className={cn(progress >= 75 ? "font-medium" : "text-emerald-400")}>Biometric</span>
            <span className={cn(progress >= 100 ? "font-medium" : "text-emerald-400")}>Complete</span>
          </div>
        </motion.div>

        <Card className="border-emerald-100 shadow-lg shadow-emerald-100/20 overflow-hidden">
          <CardHeader className="bg-gradient-header">
            <CardTitle className="flex items-center gap-2">
              {step === "nin" && <Shield className="h-5 w-5" />}
              {step === "bvn" && <User className="h-5 w-5" />}
              {step === "biometric" && <Fingerprint className="h-5 w-5" />}
              {step === "success" && <CheckCircle className="h-5 w-5" />}
              {getStepTitle()}
            </CardTitle>
            <CardDescription className="text-white/80">{getStepDescription()}</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {step === "nin" && (
                <motion.form
                  key="nin-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleNINSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">NIN Number</label>
                    <Input
                      type="text"
                      value={nin}
                      onChange={(e) => setNin(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      pattern="[0-9]{11}"
                      required
                      placeholder="Enter your 11-digit NIN number"
                      aria-label="NIN Number"
                      disabled={isLoading}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 flex items-center gap-1 text-sm"
                      >
                        <AlertCircle className="h-4 w-4" /> {error}
                      </motion.p>
                    )}
                  </div>
                  <Button type="submit" className="w-full verification-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify NIN"
                    )}
                  </Button>
                </motion.form>
              )}

              {step === "bvn" && (
                <motion.form
                  key="bvn-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleBVNSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">BVN Number</label>
                    <Input
                      type="text"
                      value={bvn}
                      onChange={(e) => setBvn(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      pattern="[0-9]{11}"
                      required
                      placeholder="Enter your 11-digit BVN number"
                      aria-label="BVN Number"
                      disabled={isLoading}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 flex items-center gap-1 text-sm"
                      >
                        <AlertCircle className="h-4 w-4" /> {error}
                      </motion.p>
                    )}
                  </div>
                  <Button type="submit" className="w-full verification-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify BVN"
                    )}
                  </Button>
                </motion.form>
              )}

              {step === "biometric" && (
                <motion.div
                  key="biometric-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">Please place your finger on the sensor</p>
                    <div className="relative w-48 h-48 mx-auto">
                      <motion.div
                        className={`absolute inset-0 rounded-full border-4 ${isScanning ? "border-emerald-500" : "border-gray-300"} transition-colors duration-300`}
                        animate={isScanning ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className={`w-32 h-32 rounded-full ${isScanning ? "bg-emerald-100" : "bg-gray-100"} flex items-center justify-center transition-colors duration-300`}
                            animate={isScanning ? { opacity: [0.7, 1, 0.7] } : {}}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                          >
                            <Fingerprint
                              className={`w-16 h-16 ${isScanning ? "text-emerald-500" : "text-gray-400"} transition-colors duration-300`}
                            />
                          </motion.div>
                        </div>
                      </motion.div>

                      {isScanning && (
                        <motion.div
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-emerald-500/10 rounded-full"
                            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeOut" }}
                          />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      {isScanning ? "Scanning fingerprint..." : "Waiting for fingerprint..."}
                    </p>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 flex items-center justify-center gap-1 text-sm mt-2"
                      >
                        <AlertCircle className="h-4 w-4" /> {error}
                      </motion.p>
                    )}
                  </div>
                  <Button
                    onClick={handleBiometricSubmit}
                    disabled={isScanning}
                    className={`w-full verification-button ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Start Biometric Verification"
                    )}
                  </Button>
                </motion.div>
              )}

              {step === "success" && user && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </motion.div>

                  <div className="bg-emerald-50 rounded-lg p-6">
                    <div className="flex justify-center mb-6">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 blur-md opacity-50" />
                        <img
                          src={user.image || "/placeholder.svg"}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="relative w-32 h-32 rounded-full object-cover border-4 border-white"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-sm text-emerald-600">First Name</p>
                          <p className="font-medium">{user.firstName}</p>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-sm text-emerald-600">Last Name</p>
                          <p className="font-medium">{user.lastName}</p>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-sm text-emerald-600">Middle Name</p>
                          <p className="font-medium">{user.middleName}</p>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-sm text-emerald-600">Gender</p>
                          <p className="font-medium">{user.gender}</p>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-sm text-emerald-600">NIN</p>
                          <p className="font-medium">{user.nin}</p>
                        </div>
                        <div className="bg-white p-3 rounded-md shadow-sm">
                          <p className="text-sm text-emerald-600">BVN</p>
                          <p className="font-medium">{user.bvn}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between">
            {step !== "nin" && step !== "success" && (
              <Button
                variant="outline"
                onClick={() => {
                  setStep(step === "biometric" ? "bvn" : "nin")
                  setError("")
                }}
                className="verification-button-outline"
              >
                Back
              </Button>
            )}
            {step === "nin" && (
              <div className="text-sm text-gray-500 w-full text-center">
                Secure verification platform for identity management
              </div>
            )}
            {step === "success" && (
              <Button
                variant="outline"
                onClick={() => {
                  setStep("nin")
                  setNin("")
                  setBvn("")
                  setUser(null)
                  setError("")
                }}
                className="w-full verification-button-outline"
              >
                Start New Verification
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
