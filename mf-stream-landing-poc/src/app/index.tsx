import React from "react";
import "./index.css";
import { PageContainer } from "@first-apps/mf-components";
import { Content, Navigation, Footer } from "./components";
import styles from "./app.module.css";

function App() {
  return (
    <PageContainer>
      <section className={styles.layout}>
        <section>
          <header>
            <Navigation />
          </header>
          <main>
            <Content />
          </main>
        </section>
        <section>
          <footer>
            <Footer />
          </footer>
        </section>
      </section>
    </PageContainer>
  );
}

export default App;
