"use client";

import { useEffect, useState } from "react";

type TitleProps = {
  sectionType: string;
  fallback: string;
};

const Title = ({ sectionType, fallback }: TitleProps) => {
  const [sectionTitle, setSectionTitle] = useState<string>(fallback);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    const fetchTitle = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/sections/${encodeURIComponent(sectionType)}`
        );
        if (!response.ok) {
          throw new Error(`Unable to load section title: ${response.status}`);
        }

        const data = await response.json();
        if (data?.is_active && typeof data.title === "string") {
          setSectionTitle(data.title);
        }
      } catch (error) {
        console.error("Error fetching section title:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTitle();
  }, [sectionType]);

  return <>{loading ? fallback : sectionTitle}</>;
};

export default Title;
