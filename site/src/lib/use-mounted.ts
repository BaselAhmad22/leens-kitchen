"use client";

import { useEffect, useState } from "react";

/** False on server and first client render; true after mount. Avoids hydration mismatches. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
