CREATE TABLE search_results (
  id SERIAL PRIMARY KEY,
  search_query STRING,
  title STRING,
  context_link STRING,
  image_link STRING,
  summary STRING,
  citations INT,
  citations_list STRING,
  year INT,
  created_at TIMESTAMP
);

ALTER TABLE search_results ADD COLUMN classify STRING;
