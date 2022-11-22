import { handleScrollToTop } from "../../helpers";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";
import { IconButton } from "../../components";

const ButtonToTop = ({ scrollRef }) => {
  return (
    <IconButton
      type="button"
      variant="sticky"
      onClick={() => handleScrollToTop(scrollRef, 0)}
    >
      <IoIosArrowUp size={25} />
    </IconButton>
  );
};

export default ButtonToTop;

ButtonToTop.propTypes = {
  scrollRef: PropTypes.object.isRequired,
};
