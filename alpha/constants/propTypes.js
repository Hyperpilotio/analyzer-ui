import PropTypes from "prop-types";


export const app = PropTypes.shape({
  _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  slo: PropTypes.shape({
    metric: PropTypes.string,
    type: PropTypes.string,
    summary: PropTypes.string,
    value: PropTypes.number,
    unit: PropTypes.string,
  }),
});

export const event = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
});
