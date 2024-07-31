import { useState } from "react";
import "./App.css";

function App() {
  let [list, modifyList] = useState([
    { title: "여자 코트 추천", likeCount: 0 },
    { title: "강남 우동 맛집", likeCount: 0 },
    { title: "파이썬독학", likeCount: 0 },
  ]);
  let [modalState, setModal] = useState(false);
  let [modalData, setModalData] = useState({});
  let [inputText, setText] = useState("");

  function like(e, index) {
    e.stopPropagation();
    const newList = list.map((item, i) => {
      if (index == i) item.likeCount += 1;
      return item;
    });
    modifyList(newList);
  }

  function setTitle(title = "여자 코트 추천") {
    let copyList = [...list];
    let index = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].title === title) {
        index = i;
        break;
      }
    }
    copyList[index].title = "남자 코트추천";
    modifyList(copyList);
  }

  function addList() {
    if (inputText !== "") {
      let copy = [...list];
      copy.unshift({ title: inputText, likeCount: 0 });
      modifyList(copy);
      setText("");
    }
  }

  function removeList(index) {
    let copy = [...list];
    copy.splice(index, 1);
    modifyList(copy);
  }
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button
        onClick={() => {
          setTitle();
        }}
      >
        글수정
      </button>

      {list.map((item, index) => {
        return (
          <div className="list" key={index}>
            <h4
              onClick={() => {
                setModalData(item);
                setModal(true);
              }}
            >
              {item.title}
              <span
                onClick={(e) => {
                  like(e, index);
                }}
              >
                👍
              </span>
              {item.likeCount}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeList(index);
                }}
                style={{ background: "red", marginLeft: "10px" }}
              >
                삭제
              </button>
            </h4>
            <p>2월 17일 발행</p>
          </div>
        );
      })}
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") addList();
        }}
      />
      <button
        onClick={() => {
          addList();
        }}
      >
        추가
      </button>
      {modalState ? <Modal modalData={modalData} setTitle={setTitle} /> : null}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.modalData.title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        onClick={() => {
          props.setTitle(props.modalData.title);
        }}
      >
        글 수정
      </button>
    </div>
  );
}

class Modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "kim",
      age: 20,
    };
  }
  render() {
    return (
      <div>
        안녕 {this.state.age}
        <button onClick={this.setState({ age: 21 })}>버튼</button>
      </div>
    );
  }
}

export default App;
