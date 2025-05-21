import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
      <h1 className="uppercase bg-black px-6 py-3 font-worksans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 mx-auto">Pitch Your Startup, <br /> connect with <br /> Enterpreneurs</h1>
      <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words !max-w-3xl">Submit Ideas, Vote on Pitches and Get Noticed in Virtual Compititions.

      </p>

</section>
    </>
  );
}
