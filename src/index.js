import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const contrast_checker = require("./contrast_checker")

const values = [
  {
    title: "Data1",
    left: { color: "#7F00FF", value: 48 },
    right: { color: "#ffe944", value: 240 }
  },
  {
    title: "Data2",
    left: { color: "#8A8AFF", value: 86 },
    right: { color: "#00008B", value: 92 }
  },
  {
    title: "Data3",
    left: { color: "#90EE90", value: 80 },
    right: { color: "#FF0000", value: 20 }
  },
  {
    title: "Data4",
    left: { color: "#fff", value: 35 },
    right: { color: "#33381e", value: 123 }
  }
];

const barTitles = props => (
  <div className="databar__titles">
    <span className="databar__data">{props.title}</span>
    <span className="databar__total">Total: {props.total}</span>
  </div>
)

const barSection = props => (
  <div
    className={`databar__${props.section}`}
    style={{
      background: props.background,
      flex: `${props.value / props.total} ${props.value / props.total} 0`,
      color: props.textColor
    }}>
    {`${Math.round((props.value / props.total) * 100)}%`}
  </div>
)

const MultiBar = (props) => {
  return (
    <div className="databar">
      {barTitles(props)}
      <div className="databar__bar">
        {barSection({
          total: props.total,
          section: "left",
          background: props.left.color,
          value: props.left.value,
          textColor: contrast_checker.blackOrWhiteTextChoice(props.left.color)
        })}
        {barSection({
          total: props.total,
          section: "right",
          background: props.right.color,
          value: props.right.value,
          textColor: contrast_checker.blackOrWhiteTextChoice(props.right.color)
        })}
      </div>
    </div>
  )
}

let bars = [];
for (let obj of values) {
  const total = obj.left.value + obj.right.value
  bars.push(
    <MultiBar
      key={obj.title}
      title={obj.title}
      total={total}
      left={obj.left}
      right={obj.right}
    />
  )
}

const app = (
  <div className="container">
    {bars}
  </div>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);