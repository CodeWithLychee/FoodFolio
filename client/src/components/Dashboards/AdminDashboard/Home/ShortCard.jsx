import PropTypes from "prop-types";

ShortCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

function ShortCard({ title, number }) {
  return (
    <div className="bg-neutral-950 px-7 py-5 rounded-xl shadow-xl w-[250px] sm:w-[300px] h-40 flex justify-center items-center text-center">
      <span className="text-white text-lg">{title}</span>
      <p className="text-white text-4xl font-bold">{number}</p>
    </div>
  );
}

export { ShortCard };
