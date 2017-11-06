import PropTypes from "prop-types";


export const app = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
});

export const event = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
});
