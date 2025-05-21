import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
// import { BadgePlus, LogOut } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-black shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo1.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">Create</span>
                {/* <BadgePlus className="size-6 sm:hidden" /> */}
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" 
                  className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95"
                >
                  <span className="max-sm:hidden w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">Logout</span>
                  {/* <LogOut className="size-6 sm:hidden text-red-500" /> */}
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                {/* <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar> */}
                <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit" 
               className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95"> <span className="max-sm:hidden w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">Login</span></button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;