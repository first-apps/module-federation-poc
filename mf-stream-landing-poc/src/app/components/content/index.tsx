import React from "react";
import styles from "./content.module.css";
import { IContentProps } from "./content.types";
import { Button, Input } from "@first-apps/mf-components";
import ArrowLongRight from "@heroicons/react/24/outline/ArrowLongRightIcon";

export const Content: React.FC<IContentProps> = () => {
  const handleSearch = (e, value) => {
    console.log(value, "searched");
  };

  return (
    <div className={styles.content}>
      <div className={styles.main}>
        <h1>Stream</h1>
        <Input
          fullWidth
          className={styles.search}
          submit={{ onSubmit: handleSearch }}
        />
        <Button
          className={styles.homeButton}
          icon={<ArrowLongRight />}
          position="right"
        >
          Go to Site
        </Button>
      </div>
    </div>
  );
};
