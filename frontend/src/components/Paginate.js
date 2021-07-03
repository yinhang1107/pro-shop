import React from "react";
import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Paginate = ({ page, pages, keyword, pathname }) => {
  const history = useHistory();

  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() =>
          history.push(
            `${pathname}?${
              keyword ? `keyword=${keyword}&` : ""
            }pageNumber=${number}`
          )
        }
      >
        {number}
      </Pagination.Item>
    );
  }

  return pages > 1 ? <Pagination>{items}</Pagination> : null;
};
export default Paginate;
