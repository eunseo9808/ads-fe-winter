import { useEffect, useRef } from "react";
import Input from "../../components/input";
import styles from "./styles.module.scss";
import { getTodayDateString } from "../../helpers/date";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

const CampaignPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const defaultValue = `캠페인_피드_광고_${getTodayDateString()}`;

  return (
    <div className={styles.container}>
      <div className={styles.badge}>1/3</div>
      <div className={styles.title}>캠페인 만들기</div>
      <div className={styles.field}>
        <div className={styles.field__name}>캠페인 만들기</div>
        <div className={styles.field__input}>
          <Input defaultValue={defaultValue} ref={inputRef} />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button theme="default">이전</Button>
        <Button theme="primary" onClick={() => navigate("group")}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default CampaignPage;
