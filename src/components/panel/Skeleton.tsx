import { Card } from "./kit";

/** Panel sayfaları sunucudan veri okurken gösterilen iskelet ekranı (loading.tsx dosyalarından kullanılır). */
const bar = "rounded-full bg-navy/[0.1] motion-safe:animate-pulse";

const Line = ({ w = "w-full", h = "h-3" }: { w?: string; h?: string }) => <div className={`${bar} ${h} ${w}`} />;

function Head({ actions = true }: { actions?: boolean }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="w-full max-w-xl">
        <div className={`${bar} h-9 w-2/3 sm:h-11`} />
        <div className="mt-4 space-y-2">
          <Line w="w-full" />
          <Line w="w-3/5" />
        </div>
      </div>
      {actions && <div className={`${bar} h-10 w-36`} />}
    </div>
  );
}

function ListRows({ n = 5 }: { n?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: n }, (_, i) => (
        <Card as="div" key={i} className="flex items-center gap-4 !p-4 sm:!p-5">
          <div className={`${bar} h-11 w-11 shrink-0 !rounded-xl`} />
          <div className="min-w-0 flex-1 space-y-2.5">
            <Line w={i % 2 ? "w-1/2" : "w-2/3"} h="h-3.5" />
            <Line w={i % 3 ? "w-4/5" : "w-3/5"} />
          </div>
          <div className={`${bar} hidden h-8 w-20 sm:block`} />
        </Card>
      ))}
    </div>
  );
}

function Grid({ n = 8 }: { n?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: n }, (_, i) => (
        <Card as="div" key={i} className="!p-2">
          <div className={`${bar} aspect-[4/3] w-full !rounded-xl`} />
          <div className="space-y-2 px-2 pb-2 pt-3">
            <Line w="w-3/4" />
            <Line w="w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function Form() {
  return (
    <div className="grid gap-6">
      {[0, 1].map((i) => (
        <Card key={i}>
          <div className={`${bar} h-6 w-48`} />
          <div className="mt-3 space-y-2">
            <Line w="w-3/4" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {Array.from({ length: i ? 2 : 6 }, (_, j) => (
              <div key={j} className="space-y-2">
                <Line w="w-24" />
                <div className={`${bar} h-11 w-full !rounded-xl`} />
              </div>
            ))}
          </div>
          <div className={`${bar} mt-6 h-10 w-36`} />
        </Card>
      ))}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Card as="div" key={i} className="space-y-3 !p-5">
            <Line w="w-1/2" />
            <div className={`${bar} h-9 w-24`} />
            <Line w="w-2/3" />
          </Card>
        ))}
      </div>
      <Card>
        <div className={`${bar} h-6 w-40`} />
        <div className={`${bar} mt-6 h-48 w-full !rounded-2xl`} />
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card as="div"><ListRows n={3} /></Card>
        <Card as="div"><ListRows n={3} /></Card>
      </div>
    </div>
  );
}

export function PanelSkeleton({ variant = "list" }: { variant?: "list" | "grid" | "form" | "dashboard" }) {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Yükleniyor…</span>
      <Head actions={variant !== "form" && variant !== "dashboard"} />
      {variant === "grid" ? <Grid /> : variant === "form" ? <Form /> : variant === "dashboard" ? <Dashboard /> : <ListRows />}
    </div>
  );
}
