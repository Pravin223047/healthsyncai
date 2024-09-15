"use client";
import GridGlobe from "../../components/ui/GridGlobe";
import Button from "../../components/Button";

const About = () => {
  return (
    <section className="w-full py-20" id="about">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-200">
        <span className="text-purple-600  text-2xl md:text-4xl">
          ⚕️ Amazing Features ⚕️
        </span>
      </h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="/medicalrecords.webp"
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />

            <div>
              <p className="grid-headtext">
                📋 Easy Medical Records Management:
              </p>
              <p className="grid-subtext">
                Organize and access your medical records in one convenient
                place, ensuring you never lose track of important health data.
              </p>
            </div>
            <Button
              name="Manage Document"
              isBeam
              containerClass="w-full mt-10"
            />
          </div>
        </div>

        <div className="col-span-1 xl:row-span-2">
          <div className="grid-container">
            <div className=" relative overflow-hidden h-full w-full">
              <div className="h-64 w-full mb-16">
                <GridGlobe />
              </div>
              <div className="mt-11 relative">
                <p className="grid-headtext">🌍 Global Doctor Network</p>
                <p className="grid-subtext">
                  Access a worldwide network of healthcare professionals,
                  ensuring that expert help is just a call or video away,
                  regardless of location.
                </p>
                <div className="z-50">
                  <Button
                    name="Join Community"
                    isBeam
                    containerClass="w-full mt-16"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-2 ">
          <div className="grid-container ">
            <img
              src="/patientscheduling.webp"
              alt="grid-1"
              className="w-full sm:h-[276px] mt-1 h-full object-contain"
            />
            <div className="mt-11 relative">
              <p className="grid-headtext">📅 Appointment Scheduling</p>
              <p className="grid-subtext">
                Effortlessly manage and track all your healthcare appointments
                with reminders and updates.
              </p>
              <Button
                name="Schedule Appointment"
                isBeam
                containerClass="w-full mt-10"
              />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-2">
          <div className="grid-container">
            <div className="flex flex-col xl:flex-row w-full gap-4 items-center justify-center">
              <img
                src="/emergency.webp"
                alt="grid-3"
                className="w-full sm:h-[266px] h-fit mb-10 object-contain"
              />
              <img
                src="/ambulancerunning.gif"
                alt="grid-3"
                className="w-full sm:h-[266px] h-fit mb-10 object-contain bg-white rounded-md"
              />
            </div>

            <div>
              <p className="grid-headtext">🚨 Emergency Feature:</p>
              <ul className="grid-subtext text-sm">
                <li>
                  ⦿ <strong> Instant Hospital Locator:</strong> In urgent
                  situations, HealthSync.AI quickly identifies and locates the
                  nearest hospitals or medical facilities based on your
                  location.
                </li>
                <li>
                  ⦿ <strong> One-Tap Help Alerts 📲:</strong> With just one tap,
                  you can send emergency alerts to family, friends, or medical
                  responders with your real-time location and health status.
                </li>{" "}
                <li>
                  {" "}
                  ⦿ <strong> Emergency Messaging 🆘:</strong> Instantly send a
                  pre-set emergency message to your emergency contacts or
                  healthcare providers, ensuring help is on the way when you
                  need it most.
                </li>{" "}
                <li>
                  ⦿ <strong> Direct Hospital Assistance 🏥:</strong> It connects
                  you with nearby hospitals for immediate communication,
                  allowing you to provide critical information before arrival.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-2 ">
          <div className="grid-container ">
            <img
              src="/videoandaudio.webp"
              alt="grid-1"
              className="w-full sm:h-[276px] mt-1 h-full object-cover"
            />
            <div className="mt-2 relative">
              <p className="grid-headtext">
                🎥 Video Consultations with Doctors:
              </p>
              <p className="grid-subtext">
                Easily schedule and participate in secure video calls with
                doctors from anywhere in the world for virtual consultations.
              </p>
            </div>
            <div className="mt-2 relative">
              <p className="grid-headtext">📞 Audio Call Feature:</p>
              <p className="grid-subtext">
                If video isn&apos;t an option, you can still consult with
                doctors via secure, high-quality audio calls, no matter where
                you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
