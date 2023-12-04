import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import styles from "./styles.module.scss";
import { useEffect, useMemo, useState } from "react";
import { getTargetGroup } from "../../api/target";

const GroupPage = () => {
  const navigate = useNavigate();
  const ages = useMemo(
    () => ["15-19", "20-24", "25-29", "30-34", "35-39", "40-49", "50"],
    []
  );

  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedAges, setSelectedAges] = useState<string[]>([]);

  const handleChangeGender = (e: any) => {
    setSelectedGender(e.target.value);
  };

  const handleSelectAge = (age: string) => {
    const hasAge = !!selectedAges.find((selectedAge) => selectedAge === age);
    if (hasAge) {
      setSelectedAges((prevState) =>
        prevState.filter((selectedAge) => selectedAge !== age)
      );
    } else {
      setSelectedAges((prevState) => [...prevState, age]);
    }
  };

  useEffect(() => {
    if (selectedAges.length === 0) return;

    (async () => {
      const data = await getTargetGroup(selectedGender, selectedAges);
      console.log(data);
    })();
  }, [selectedAges, selectedGender]);

  return (
    <div className={styles.container}>
      <div className={styles.badge}>2/3</div>
      <div className={styles.title}>광고그룹 만들기</div>
      <div className={styles.name}>오디언스 티켓</div>
      <div className={styles.field}>
        <div className={styles.field__name}>성별</div>
        <div className={styles.field__input}>
          <input
            id="all"
            name="gender"
            type="radio"
            value="all"
            defaultChecked={true}
            onClick={handleChangeGender}
          />
          <label htmlFor="all">모든 성별</label>
          <input
            id="male"
            name="gender"
            type="radio"
            value="male"
            onClick={handleChangeGender}
          />
          <label htmlFor="male">남자</label>
          <input
            id="femail"
            name="gender"
            type="radio"
            value="female"
            onClick={handleChangeGender}
          />
          <label htmlFor="femail">여자</label>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.field__name}>연령</div>
        <div className={styles.field__input}>
          {ages.map((age) => (
            <div key={age} onClick={() => handleSelectAge(age)}>
              {age}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <Button theme="default">이전</Button>
        <Button theme="primary" onClick={() => navigate("subject")}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default GroupPage;
