import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@alicloud/xconsole'

const childs = ['Error', 'Loading', 'Default', 'Empty'];

const XQuery = (props) => {
  const {
    model,
    variables: vars = {},
    children,
    onData = () => {},
    onError = () => {},
    checkEmpty = (data) => {
      if (Object.keys(data).length < 1) {
        return true
      }
      return false;
    },
  } = props;

  const [queryData, setQueryData] = useState(null);

  const content = {};

  // 如果是多个子元素的话就按照这个 去进行
  if (children.forEach) {
    children.forEach((item) => {
      content[item.type.type] = item;
    });
  } else {
    content[children.type.type] = children;
  }

  return queryData === null ? (
    <Query
      query={model}
      variables={vars}
    >
      {
        ({ data, error, loading, refetch, variables }) => {
          const fullData = { data, error, loading, refetch, variables };

          console.log('debugme ondata fullData', data, loading, error)
          if (error instanceof Error) {
            onError(error);
            return content.Error || null
          }

          if (!(error instanceof Error) && !loading) {
            console.log('ondata', data, fullData)

            if (checkEmpty(data, fullData) === true) {
              return content.Empty || null
            } else {
              onData(data, fullData);
              setQueryData(fullData);
              return content.Default || null
            }
          }
          return content.Loading || null
        }
      }
    </Query>
  ) : (content.Default)
};

// const getComponent = (type) => {
//   const XQueryChild = (props) => {
//     const {
//       children,
//     } = props;


//     return <Fragment>{children}</Fragment>
//   };
//   XQueryChild.propTypes = {
//     children: PropTypes.arrayOf(PropTypes.any),
//   }
//   XQueryChild.type = type;
//   return XQueryChild;
// }


// childs.forEach((item) => {
//   XQuery[item] = getComponent(item);
// })

XQuery.propTypes = {
  model: PropTypes.objectOf(PropTypes.any),
  variables: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.arrayOf(PropTypes.any),
  onData: PropTypes.func,
  checkEmpty: PropTypes.func,
}


XQuery.Error = (props) => {
  const {
    children,
  } = props;


  return <Fragment>{children}</Fragment>
};
XQuery.Error.type = 'Error';
XQuery.Error.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any),
}

XQuery.Loading = (props) => {
  const {
    children,
  } = props;


  return <Fragment>{children}</Fragment>
};
XQuery.Loading.type = 'Loading';
XQuery.Loading.propTypes = {
  children: PropTypes.arrayOf(PropTypes.Node),
}

XQuery.Default = (props) => {
  const {
    children,
  } = props;
  console.log('default props', props);


  return <Fragment>{children}</Fragment>
};
XQuery.Default.type = 'Default';
XQuery.Default.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any),
}

XQuery.Empty = (props) => {
  const {
    children,
  } = props;


  return <Fragment>{children}</Fragment>
};
XQuery.Empty.type = 'Empty';
XQuery.Empty.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any),
}


export default XQuery;

