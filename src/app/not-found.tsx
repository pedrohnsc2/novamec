import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-bg px-6 py-20">
      <div className="text-center">
        <p className="font-serif text-7xl font-bold text-secondary">404</p>
        <h1 className="mt-4 font-serif text-2xl font-bold text-text sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mt-4 max-w-md text-text-light">
          A página que você procura não existe ou foi movida. Confira o endereço
          digitado ou volte para a página inicial.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary-dark"
          >
            <Home className="h-5 w-5" />
            Ir para o Início
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Fale Conosco
          </Link>
        </div>
      </div>
    </section>
  );
}
