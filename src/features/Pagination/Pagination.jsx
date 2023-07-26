/* eslint-disable react/prop-types */
import styles from "./Pagination.module.scss";
export default function Pagination({
  arr,
  setterFunc,
  page,
  maxNum,
  paginatedArr,
}) {
  if (arr.length < maxNum) return null;

  return (
    <div className={styles.paginationWrapper}>
      {page > 1 && (
        <button onClick={() => setterFunc((page) => page - 1)}>
          {page - 1}
        </button>
      )}
      <button className={styles.activePage}>{page}</button>
      {paginatedArr.length === maxNum && (
        <button onClick={() => setterFunc((page) => page + 1)}>
          {page + 1}
        </button>
      )}
    </div>
  );
}
