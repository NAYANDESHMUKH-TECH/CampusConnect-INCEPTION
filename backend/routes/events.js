const express = require('express');
const router = express.Router();
const store = require('../data/events');

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Tech Fest
 *         description:
 *           type: string
 *           example: Annual technical fest with coding competitions
 *         date:
 *           type: string
 *           format: date
 *           example: 2025-09-12
 *         category:
 *           type: string
 *           example: Technical
 *         posted_by:
 *           type: string
 *           example: IEEE Club
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', (req, res) => {
  res.json(store.getAll());
});

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - posted_by
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               posted_by:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 */
router.post('/', (req, res) => {
  const { title, description, date, category, posted_by } = req.body;
  if (!title || !date || !posted_by) {
    return res.status(400).json({ message: 'title, date and posted_by are required' });
  }
  const ev = store.create({ title, description, date, category, posted_by });
  res.status(201).json(ev);
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ev = store.getById(id);
  if (!ev) return res.status(404).json({ message: 'Event not found' });
  res.json(ev);
});

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *               posted_by:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updated = store.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Event not found' });
  res.json(updated);
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Event not found
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ok = store.remove(id);
  if (!ok) return res.status(404).json({ message: 'Event not found' });
  res.status(204).send();
});

module.exports = router;
