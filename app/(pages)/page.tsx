import Link from "next/link";
import WardSearch from "../components/ui/WardSearch";
import FindMyWard from "./find-my-ward/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="flex items-center justify-center flex-col w-screen min-h-80 p-10 bg-sky-100" id="hero">
      <h1 className="font-semibold text-6xl text-sky-400 flex flex-col justify-around m-1">Ward Wise
        <span className="font-medium text-xl text-black leading-5 pl-2"> Keeping the government accountable</span>
      </h1>
      </section>
        <article className="flex items-center justify-center my-5 p-5 gap-4" id="WhatIs">
          <h2 className=" text-center lg:text-center text-sky-500 font-bold text-lg md:text-2xl lg:text-4xl w-5/12 leading-5">What Is A Ward?</h2>
          <p className="text-left flex-wrap w-5/12 text-sm lg:text-xl lg:leading-6 leading-4 tracking-tight indent-3">The City of Chicago is divided into fifty legislative districts or wards. Each district is represented by an alderperson who is elected by their constituency to serve a four year term.</p>
        </article>
        <section className="flex items-center justify-center my-5 py-10 gap-4" id="HowMuch">
          <p className="text-xl lg:text-4xl w-6/12 text-center"> $1.5 Million</p>
          <h2 className=" text-center max-w-6/12 text-sky-500 font-bold text-lg md:text-xl lg:text-4xl w-7/12 leading-5">How Much Funding Does My Ward Get?</h2>
        </section>
    </main>
  );
}
