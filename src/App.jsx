import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // todo入力部分に文字を入れる処理
  const [inputText, setinputText] = useState("");
  // 未完了のリストにデータを入れる
  const [data, setdata] = useState([]);
  // 完了のリストにデータを入れる
  const [compdata, setcompdata] = useState([]);
  // inputTextの部分に何か入れたらデータを取得する処理
  const onChange_inputText = (event) => setinputText(event.target.value);
  // 追加ボタンを押したときの処理
  const onClickButton = () => {
    // 追加するデータがない場合、リストに入れないように実装
    if (inputText === "") return;
    // newTodosの配列を作り、dataの配列の最後にinputTextを追加したものを格納
    const newTodos = [...data, inputText];
    // useStateでセットしている、setdataを使うことで、中身をnewTodosのものに更新

    setdata(newTodos);
    // inputTextに入力後値が残っているので、値を消してplaceholderで設定した表示にする
    setinputText("");
  };
  // 削除を押したときの処理
  // indexを引数にすることで、該当の項目の削除ができる
  const onClickDelete = (index) => {
    // newTodosに未完了のデータを入力
    const newTodos = [...data];
    // spliceで該当番号を削除
    newTodos.splice(index, 1);
    // 該当部分を削除後、再度newTodosに入力し更新
    setdata(newTodos);
  };
  const onClickcomp = (index) => {
    // newTodosに未完了のデータを入力
    const newdataTodos = [...data];
    // spliceで該当番号を削除
    newdataTodos.splice(index, 1);
    // 該当部分を削除後、再度newTodosに入力し更新
    const newcompdata = [...compdata, data[index]];
    //編集した未完了のデータを再度入力
    setdata(newdataTodos);
    // 編集した完了のデータを再度入力
    setcompdata(newcompdata);
  };

  const onClickback = (index) => {
    const newcompdata = [...compdata];
    newcompdata.splice(index, 1);

    const newdataTodos = [...data, compdata[index]];
    setcompdata(newcompdata);
    setdata(newdataTodos);
  };
  return (
    <>
      <div className="input-area">
        {/* todo入力項目の入力された値を取得 */}
        {/* onChangeの設定をすることで入力データを取得できる */}
        <input
          placeholder="todoを入力"
          value={inputText}
          onChange={onChange_inputText}
        />
        <button onClick={onClickButton}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のリスト</p>
        <ul>
          {/* useStateを使って配列データを１つずつ取得する */}
          {data.map((data, index) => {
            return (
              <div key={data} className="list-row">
                <li>{data}</li>
                <button onClick={() => onClickcomp(index)}>完了</button>
                {/* ()=>をつけることで自動的に関数の実行が走るのを防ぐ */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のリスト</p>
        <ul>
          {compdata.map((compdata, index) => {
            return (
              <div key={compdata} className="list-row">
                <li>{compdata}</li>
                <button onClick={() => onClickback(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
