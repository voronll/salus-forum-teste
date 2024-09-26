import SalusLogo from "@/app/assets/SalusLogoV2.png";
import { Card } from "@nextui-org/card";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black min-h-screen p-8">
      <Head>
        <title>Salus - Forum</title>
        <meta name="description" content="Forum de Cybersecurity" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="bg-black w-full py-4 border-b-2 border-gray-600 flex justify-between items-center">
        <a
          href="/home_page"
          className="flex items-center text-white no-underline"
        >
          <Image
            src={SalusLogo}
            alt="Logo"
            width={70}
            height={70}
            className="mr-4"
          />
          <span className="text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Salus
          </span>
        </a>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#"
                className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
              >
                Documentação
              </a>
            </li>
            <li>
              <a
                href="#"
                className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
              >
                Comunidade
              </a>
            </li>
            <li>
              <a
                href="#"
                className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* LOGO DE BACKGROUND */}
      <div className="relative pt-20 flex justify-center items-center h-[80vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={SalusLogo}
            alt="Background Logo"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            className="opacity-10"
          />
        </div>

        {/* TEXTO PRINCIPAL */}
        <div className="relative z-10 text-center">
          <div className="text-7xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            A maior central de Cybersecurity do Brasil
          </div>
          <div className="pt-10 text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Junte-se a uma comunidade que busca navegar por esse oceano de
            curiosidades.
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="pt-20 flex justify-center space-x-6">
        <Card className="max-w-md w-full bg-zinc-900 p-6 rounded-lg shadow-lg">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Desbrave o desconhecido, sem medo.
            </h2>
            <p className="text-orange-400 pt-5 font-bold">
              A Salus contém um arsenal de conteúdo infinito sobre a área mais
              interessante da computação, explore sem medo e aproveite todo o
              conteúdo que nós temos a oferecer.
            </p>
          </div>
        </Card>

        <Card className="max-w-md w-full bg-zinc-900 p-6 rounded-lg shadow-lg">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Contribua, aprenda e pratique.
            </h2>
            <p className="text-orange-400 pt-5 font-bold">
              Ao fazer parte da nossa comunidade, você ajuda várias outras pessoas
              com o mesmo objetivo que o seu: aprender.
            </p>
          </div>
        </Card>

        <Card className="max-w-md w-full bg-zinc-900 p-6 rounded-lg shadow-lg">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Trilhe seu caminho numa área amplamente requisitada.
            </h2>
            <p className="text-orange-400 pt-5 font-bold">
              Com a nossa rota de cursos e preparatórios das mais variadas certificações,
              você adquire uma base sólida para o mercado de trabalho.
            </p>
          </div>
        </Card>
      </div>

      {/* SUB-HEADER */}
      <div className="flex justify-center py-10">
        <Card className="w-full max-w-7xl bg-zinc-900 p-6 rounded-lg shadow-lg flex items-center">

          <div className="">
            <Image
              src={SalusLogo}
              alt="salus-logo"
              width={150}
              height={150}
              className="rounded-lg object-cover"
            />
          </div>
          <div> 
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              O que você vai encontrar na Salus?
            </h2>
            <p className="text-orange-400 pt-5 font-bold">
              Um vasto oceano de conteúdo relacionado exclusivamente a Segurança da Informação! Se aventure em tópicos, discuta e aprenda tudo sobre a área mais requisitada de TI.
            </p>
          </div>
        </Card>

      </div>
    </div>
  );
}
