import React, { useCallback, useEffect, useState } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { Loading } from "../components/Loading";
import { ErrorBox } from "../components/ErrorBox";
import { SelectPhoneApp } from "./SelectPhoneApp";

// Bài 2: giống Bài 1 nhưng dữ liệu lấy từ API (hoặc offline fallback)
export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // TODO 1
    setError(null);
    setPhone(null);
    // TODO 2
    try {
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    }
  }, []);

  // TODO 3
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4
  if (error) return <ErrorBox message={error} onRetry={load} />;
  // TODO 5
  if (!phone) return <Loading />;
  // TODO 6
  return <SelectPhoneApp phone={phone} />;
}
