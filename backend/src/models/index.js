const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const { Schema } = mongoose;

// ═══════════════════════════════════════════
// USER MODEL
// ═══════════════════════════════════════════
const UserSchema = new Schema({
  name:         { type: String, required: true, trim: true, maxlength: 100 },
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:     { type: String, required: true, minlength: 6, select: false },
  role:         { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
  phone:        { type: String, trim: true },
  company:      { type: String, trim: true },
  isActive:     { type: Boolean, default: true },
  lastLogin:    { type: Date },
  refreshToken: { type: String, select: false },
}, { timestamps: true });

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
};

// ═══════════════════════════════════════════
// PRODUCT MODEL
// ═══════════════════════════════════════════
const ProductSchema = new Schema({
  name:        { type: String, required: true, trim: true },
  slug:        { type: String, unique: true, lowercase: true },
  badge:       { type: String, default: '' },
  category:    { type: String, required: true, enum: ['Copier Paper', 'Bond Paper', 'Colour Paper', 'Photo Paper', 'Kraft Paper', 'Tissue Paper', 'Specialty Paper'] },
  description: { type: String, required: true },
  specs: [{
    label: { type: String, required: true },
    value: { type: String, required: true },
  }],
  gsm:         { type: Number },
  sizes:       [{ type: String }],
  inStock:     { type: Boolean, default: true },
  gemApproved: { type: Boolean, default: false },
  isFeatured:  { type: Boolean, default: false },
  price:       { type: Number },
  minOrder:    { type: Number, default: 1 },
  tags:        [{ type: String }],
  createdBy:   { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ gemApproved: 1 });
ProductSchema.index({ slug: 1 });

// ═══════════════════════════════════════════
// TENDER MODEL
// ═══════════════════════════════════════════
const TenderSchema = new Schema({
  gemId:       { type: String, required: true, unique: true },
  title:       { type: String, required: true },
  org:         { type: String, required: true },
  state:       { type: String, required: true },
  quantity:    { type: Number, required: true },
  unit:        { type: String, default: 'Nos' },
  value:       { type: Number },
  category:    { type: String },
  startDate:   { type: Date },
  endDate:     { type: Date },
  status:      { type: String, enum: ['open', 'closing', 'expired', 'awarded'], default: 'open' },
  isNew:       { type: Boolean, default: false },
  source:      { type: String, default: 'gem' },
  gemUrl:      { type: String, default: 'https://bidplus.gem.gov.in/all-bids' },
}, { timestamps: true });

TenderSchema.index({ gemId: 1 });
TenderSchema.index({ endDate: 1 });
TenderSchema.index({ status: 1 });
TenderSchema.index({ title: 'text', org: 'text', category: 'text' });

// ═══════════════════════════════════════════
// INQUIRY MODEL
// ═══════════════════════════════════════════
const InquirySchema = new Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, lowercase: true, trim: true },
  phone:    { type: String, required: true, trim: true },
  company:  { type: String, trim: true },
  product:  { type: String, trim: true },
  quantity: { type: String, trim: true },
  message:  { type: String, trim: true },
  status:   { type: String, enum: ['new', 'contacted', 'quoted', 'closed'], default: 'new' },
  notes:    { type: String },           // admin notes
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  ip:       { type: String },
}, { timestamps: true });

InquirySchema.index({ status: 1 });
InquirySchema.index({ createdAt: -1 });

// ═══════════════════════════════════════════
// CERTIFICATION MODEL
// ═══════════════════════════════════════════
const CertificationSchema = new Schema({
  name:        { type: String, required: true },
  icon:        { type: String },
  description: { type: String },
  issuedBy:    { type: String },
  validUntil:  { type: Date },
  certificateUrl: { type: String },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

// ═══════════════════════════════════════════
// ADMIN LOG MODEL
// ═══════════════════════════════════════════
const AdminLogSchema = new Schema({
  user:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action:  { type: String, required: true },
  entity:  { type: String },           // 'product', 'tender', 'inquiry', etc.
  entityId: { type: Schema.Types.ObjectId },
  details: { type: Schema.Types.Mixed },
  ip:      { type: String },
}, { timestamps: true });

AdminLogSchema.index({ user: 1 });
AdminLogSchema.index({ createdAt: -1 });
AdminLogSchema.index({ entity: 1, entityId: 1 });

// ═══════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════
module.exports = {
  User:          mongoose.model('User', UserSchema),
  Product:       mongoose.model('Product', ProductSchema),
  Tender:        mongoose.model('Tender', TenderSchema),
  Inquiry:       mongoose.model('Inquiry', InquirySchema),
  Certification: mongoose.model('Certification', CertificationSchema),
  AdminLog:      mongoose.model('AdminLog', AdminLogSchema),
};
