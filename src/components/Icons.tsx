import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Psi (Ψ) işareti */
export const Mark = (p: P) => (
  <svg viewBox="0 0 64 64" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M10 14c0-2 .8-3 2.6-3 1 0 1.9.4 2.7 1.3 2 2.2 3.2 6 3.9 10.7.8 5.4 3.7 8.2 8.4 8.6V8.5c0-1.4-.7-2.1-2.1-2.4l-1-.2V4h12.9v1.9l-1 .2c-1.4.3-2.1 1-2.1 2.4v20.1c4.7-.4 7.6-3.2 8.4-8.6.7-4.700 1.9-8.500 3.900-10.700.8-.9 1.700-1.300 2.700-1.300 1.800 0 2.600 1 2.600 3 0 3.200-.7 7-1.500 10.800-1.600 7.600-6 12.300-14 12.900v10.500c0 1.400.7 2.100 2.100 2.400l1 .2V60H25.600v-1.900l1-.2c1.400-.3 2.100-1 2.100-2.400V45c-8-.6-12.400-5.300-14-12.900C13.800 21.700 10 17.200 10 14Z"
    />
  </svg>
);

export const Arrow = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...base} strokeWidth={1.5} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.500-6" />
  </svg>
);
export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...base} {...p}>
    <path d="M12 21s7-6.2 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z" />
    <circle cx="12" cy="9.500" r="2.500" />
  </svg>
);
export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...base} {...p}>
    <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.200" cy="6.800" r=".6" fill="currentColor" />
  </svg>
);
export const Linkedin = (p: P) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...base} {...p}>
    <rect x="3.500" y="3.500" width="17" height="17" rx="3" />
    <path d="M8 10.500V16M8 7.800v.1M11.500 16v-5.500M11.500 13c0-1.500 1-2.500 2.300-2.500S16 11.400 16 13v3" />
  </svg>
);

/** Kategori çizgi ikonları (görsel yoksa yer tutucuda kullanılır) */
export const CategoryIcon = ({ name, ...p }: { name: string } & P) => {
  const paths: Record<string, React.ReactNode> = {
    kaygi: (
      <>
        <path d="M3 12c2.500-5 4.500-5 6 0s3.500 5 6 0 4-5 6 0" />
        <path d="M3 17c2.500-4 4.500-4 6 0s3.500 4 6 0 4-4 6 0" opacity=".5" />
      </>
    ),
    duygu: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.600 5.600 7 7M17 17l1.400 1.400M18.400 5.600 17 7M7 17l-1.400 1.400" />
      </>
    ),
    iliski: (
      <>
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </>
    ),
    yeme: (
      <>
        <path d="M5 11h14a7 7 0 0 1-14 0Z" />
        <path d="M9 7c0-1.500 1.500-1.500 1.500-3M14 7c0-1.500 1.500-1.500 1.500-3" />
      </>
    ),
    gunluk: (
      <>
        <path d="M12 3c4 3.500 6 6.500 6 9.500a6 6 0 0 1-12 0C6 9.500 8 6.500 12 3Z" />
        <path d="M12 21v-8" opacity=".5" />
      </>
    ),
    ozel: (
      <>
        <path d="M12 20s-7-4.300-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.700-7 10-7 10Z" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" {...base} {...p}>
      {paths[name] ?? paths.ozel}
    </svg>
  );
};

/** Hizmet kartı ikonları: bireysel, çift, online */
export const TherapyIcon = ({ name, ...p }: { name: string } & P) => {
  const paths: Record<string, React.ReactNode> = {
    "bireysel-psikoterapi": (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.6-3.800 3.300-6 7-6s6.400 2.200 7 6" />
      </>
    ),
    "cift-terapisi": (
      <>
        <circle cx="8.500" cy="8.500" r="3" />
        <circle cx="15.500" cy="8.500" r="3" />
        <path d="M2.500 19.500c.5-3 2.700-4.800 6-4.800M21.500 19.500c-.5-3-2.700-4.800-6-4.800M9 15.800c1-.5 2-.7 3-.7s2 .2 3 .7" />
      </>
    ),
    "online-psikoterapi": (
      <>
        <rect x="3.500" y="5" width="17" height="11.500" rx="1.800" />
        <path d="M8 20h8M12 16.500V20" />
        <path d="M9.500 10.800c.8-1 1.600-1.500 2.500-1.500s1.700.5 2.500 1.500" opacity=".6" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" {...base} {...p}>
      {paths[name] ?? paths["bireysel-psikoterapi"]}
    </svg>
  );
};

/** Eğitimler sayfası grup ikonları */
export const EducationIcon = ({ name, ...p }: { name: string } & P) => {
  const paths: Record<string, React.ReactNode> = {
    egitim: (
      <>
        <path d="M3 9.500 12 5l9 4.500-9 4.500-9-4.500Z" />
        <path d="M7 11.800V16c0 1.300 2.200 2.500 5 2.500s5-1.200 5-2.500v-4.200M21 9.500V14" />
      </>
    ),
    sertifika: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M9.200 13.200 8 21l4-2 4 2-1.200-7.800" />
      </>
    ),
    klinik: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3.500" />
        <path d="M12 8.500v7M8.500 12h7" />
      </>
    ),
    gonullu: <path d="M12 20s-7-4.300-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.700-7 10-7 10Z" />,
  };
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" {...base} {...p}>
      {paths[name] ?? paths.egitim}
    </svg>
  );
};
