import { Link } from "react-router-dom";
import PropTypes from "prop-types";

List.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  addClasses: PropTypes.string,
  icon: PropTypes.element.isRequired,
};

function List({ list, title, icon, addClasses }) {
  return (
    <div
      className={`bg-neutral-950 px-7 py-5 rounded-xl shadow-xl w-full md:max-w-[350px] max-h-96 overflow-auto ${addClasses}`}
    >
      <div className="flex flex-col justify-between h-full">
        <span className="text-white font-bold text-xl ml-3">New {title}</span>
        <ul className="divide-y divide-gray-700 text-white">
          {list.length === 0 ? (
            <li className="mt-2 pl-3 mb-5">No new {title}</li>
          ) : (
            list.map((item, index) => (
              <li key={index} className="py-2 pl-3 mb-2 hover:bg-gray-700">
                <Link to={`/admin/complaint/${item._id}`} className="flex">
                  <div className="flex items-center gap-3 w-full">
                    <span>{icon}</span>
                    <div className="w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-xs">{item.student.name}</span>
                        <span className="text-sm font-medium">{item.desc}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export { List };
