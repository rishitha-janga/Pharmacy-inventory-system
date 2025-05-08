const subscriptionHistorySchema = mongoose.Schema({
    patientId: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    subscribedOn: Date,
    validTill: Date,
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active"
    }
  });
  
  const SubscriptionHistory = mongoose.model("SubscriptionHistory", subscriptionHistorySchema);
  export default SubscriptionHistory;
  