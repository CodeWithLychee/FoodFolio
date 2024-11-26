import PropTypes from "prop-types";
import { motion } from "framer-motion";

TeamCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
  }).isRequired,
};

function TeamCard({ member }) {
  return (
    <motion.div
      className="rounded-lg shadow-lg p-8 bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-full w-40 h-40 mx-auto mb-4"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover object-center rounded-full"
          src={member.image}
          alt={member.name}
        />
      </motion.div>
      <div className="text-center">
        <motion.h3
          className="text-xl font-medium text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {member.name}
        </motion.h3>
        <motion.div
          className="text-gray-400 text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {member.designation}
        </motion.div>
        <motion.a
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          View Profile
        </motion.a>
      </div>
    </motion.div>
  );
}

export { TeamCard };
