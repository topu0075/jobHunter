import PropTypes from "prop-types";
import Card from "../Card/Card";

const Cards = ({ jobs }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-5 px-2 md:px-8'>
      {jobs.map((card) => (
        <Card key={card._id} job={card}></Card>
      ))}
    </div>
  );
};

Cards.propTypes = {
  jobs: PropTypes.array,
};

export default Cards;
