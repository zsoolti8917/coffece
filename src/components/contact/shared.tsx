"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

export interface ContactFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  office_size?: string;
  coffee_type?: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

const initialState: ContactFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function useContactForm() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const setField = useCallback((name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("loading");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });
        if (!res.ok) throw new Error("Failed");
        setStatus("success");
        setFormState(initialState);
      } catch {
        setStatus("error");
      }
    },
    [formState],
  );

  return { formState, status, handleChange, setField, handleSubmit };
}

export function StatusMessage({ status, successText, errorText }: {
  status: FormStatus;
  successText: string;
  errorText: string;
}) {
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 rounded-xl bg-green-50 border border-green-200 px-4 py-3"
      >
        <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-green-700 text-sm font-medium">{successText}</p>
      </motion.div>
    );
  }

  if (status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3"
      >
        <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 110 18A9 9 0 0112 3z" />
        </svg>
        <p className="text-red-600 text-sm font-medium">{errorText}</p>
      </motion.div>
    );
  }

  return null;
}
