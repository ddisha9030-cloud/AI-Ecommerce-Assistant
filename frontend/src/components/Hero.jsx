import AIAssistant from "./AIAssistant";
function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="eyebrow">
          PERSONALIZED SHOPPING, SIMPLIFIED
        </p>

        <h1>
          Shopping that
          <br />
          <span>understands you.</span>
        </h1>

        <p className="hero-description">
          Tell us what you're looking for. ShopAI understands
          your preferences, budget and requirements to help
          you discover products that actually fit your needs.
        </p>

        <div className="hero-actions">

          <button className="primary-button">
            Ask ShopAI
          </button>

          <button className="secondary-button">
            Browse Products
          </button>

        </div>

        <div className="hero-note">
          Personalized recommendations • Smarter decisions
        </div>

      </div>


      {/* AI Assistant Preview */}

      <div className="assistant-preview">
        <AIAssistant />

      </div>

    </section>
  );
}

export default Hero;