import gql from 'graphql-tag';

const UPDATE_COLUMN_ORDER = gql`
  mutation UpdateColumnOrder($columnOrder: [ID]!) {
    updateColumnOrder(columnOrder: $columnOrder) {
      id
      title
      taskIds
    }
  }
`;

export default UPDATE_COLUMN_ORDER;
