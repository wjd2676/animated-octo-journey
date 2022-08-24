import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router-dom";
const Todo = () => {
  const [userInputTodo, setUserInputTodo] = useState("");
  const [getTodo, setGetTodo] = useState([]);
  const [submitRes, setSubmitRes] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [updateTodo, setUpdateTodo] = useState("");
  const [updateChecked, setUpdateChecked] = useState();

  useEffect(() => {
    fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`SignInJWT`)}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setGetTodo(res));
  }, [submitRes]);

  const TodoSubmitHandle = () => {
    fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`SignInJWT`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: `${userInputTodo}`,
        }),
      }
    ).then((res) => setSubmitRes(res));
  };

  const TodoUpdateModeHandle = (index) => {
    setIsSelected(index);
  };

  const TodoUpdateHandle = (id) => {
    fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`SignInJWT`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: `${updateTodo}`,
          isCompleted: updateChecked,
        }),
      }
    )
      .then((res) => setSubmitRes(res))
      .then(() => setIsSelected(null));
  };

  const TodoDeleteHandle = (id) => {
    fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`SignInJWT`)}`,
        },
      }
    ).then((res) => setSubmitRes(res));
  };

  console.log(updateTodo);
  console.log(updateChecked);
  console.log(submitRes);

  return (
    <div>
      {!localStorage.getItem("SignInJWT") && <Navigate to="/" replace={true} />}
      <TodoContainer>
        <TodoGetContent>
          {getTodo.map((data, index) => (
            <div key={data.id}>
              {index === isSelected ? (
                <TodoUpdateModal>
                  <TodoTextUpdate
                    defaultValue={data.todo}
                    onChange={(e) => setUpdateTodo(e.target.value)}
                  ></TodoTextUpdate>
                  <input
                    type="checkbox"
                    defaultChecked={data.isCompleted}
                    onChange={(e) => setUpdateChecked(e.target.checked)}
                  />
                  <TodoUpdateButton onClick={() => TodoUpdateHandle(data.id)}>
                    완료
                  </TodoUpdateButton>
                  <TodoUpdateCancleButton
                    onClick={() => TodoUpdateModeHandle()}
                  >
                    취소
                  </TodoUpdateCancleButton>
                </TodoUpdateModal>
              ) : (
                <TodoList key={data.id}>
                  <div>{index}</div>
                  <TodoText>{data.todo}</TodoText>
                  <input
                    type="checkbox"
                    defaultChecked={data.isCompleted}
                    disabled
                  />
                  <TodoUpdateButton
                    onClick={() => {
                      TodoUpdateModeHandle(index);
                    }}
                  >
                    수정
                  </TodoUpdateButton>
                  <TodoDeleteButton
                    onClick={() => {
                      TodoDeleteHandle(data.id);
                    }}
                  >
                    삭제
                  </TodoDeleteButton>
                </TodoList>
              )}
            </div>
          ))}
        </TodoGetContent>
        <TodoPostContent>
          <TodoInput
            type="text"
            onChange={(e) => setUserInputTodo(e.target.value)}
          ></TodoInput>
          <TodoSubmit
            onClick={(e) => {
              TodoSubmitHandle();
            }}
          >
            제출
          </TodoSubmit>
        </TodoPostContent>
      </TodoContainer>
    </div>
  );
};

const TodoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const TodoGetContent = styled.div`
  border: 2px solid blue;
  width: 40%;
  min-width: 600px;
  min-height: 600px;
`;

const TodoList = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid black;
`;

const TodoText = styled.div`
  width: 400px;
  white-space: wrap;
`;

const TodoUpdateModal = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px black solid;
`;

const TodoTextUpdate = styled.input`
  width: 400px;
  white-space: wrap;
`;

const TodoDeleteButton = styled.button`
  width: 40px;
  height: 20px;
`;

const TodoUpdateButton = styled.button`
  width: 40px;
  height: 20px;
`;

const TodoUpdateCancleButton = styled.button`
  width: 40px;
  height: 20px;
`;

const TodoPostContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid red;
  width: 40%;
  min-width: 600px;
  height: 200px;
`;

const TodoInput = styled.input`
  width: 70%;
  height: 150px;
`;

const TodoSubmit = styled.button`
  width: 50px;
  height: 30px;
`;

export default Todo;
