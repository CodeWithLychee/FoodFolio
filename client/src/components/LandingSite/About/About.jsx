import { TeamCard } from "./TeamMember";
import abhiImg from "../../../assets/abhi.jpg";
import kartikImg from "../../../assets/kartikk.jpg";
import danveerImg from "../../../assets/x.jpg";

function About() {
  const teamMembers = [
    {
      name: "Abhinav Sharma",
      designation: "Full Stack Developer",
      image: abhiImg,
    },
    {
      name: "Raghav Bhagat",
      designation: "Full Stack Developer",
      image: kartikImg,
    },
    {
      name: "Harnoor Singh Aulakh",
      designation: "Full Stack Developer",
      image: danveerImg,
    },
  ];

  return (
    <section className="bg-gray-900 py-16">
      <h1 className="font-bold text-white text-center text-5xl mb-10 tracking-wide">
        Meet Our Team!
      </h1>
      <div className="flex flex-wrap gap-12 justify-center items-center">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}

export { About };
