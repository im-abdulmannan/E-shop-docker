import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <br />
          <br />
          {allEvents.length !== 0 ? (
            <EventCard active={true} data={allEvents && allEvents[0]} />
          ) : (
            <div className="h-[50vh] flex items-center justify-center">
              <p className="text-[#000000b1] font-[500]">
                There are no ongoing events at the moment; please try again at a
                later time.
              </p>
            </div>
          )}
          <br />
          <br />
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;
